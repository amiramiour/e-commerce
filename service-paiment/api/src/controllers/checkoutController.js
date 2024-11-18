const Paiment = require('../models/paimentModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckout = async (req, res) => {
    try {
        const products = req.body.products;
        const lineItems = products.map(product => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.name,
                    description: product.description,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `http://${req.headers.host}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${req.headers.host}/cancel`,
        });

        await Paiment.create({
            userId: 1,
            sessionId: session.id,
            status: 'created',
            amount_total: session.amount_total,
            currency: session.currency,
            payment_method_types: session.payment_method_types.join(','),
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.manageWebhook = async (req, res) => {
    console.log('SSSSSSSSSSSSSSS Received webhook');
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event: ${event.type}`);

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Session completed: ${session.id}`);
            await Paiment.update(
                { status: 'completed' },
                { where: { sessionId: session.id } }
            );
            break;

        case 'checkout.session.async_payment_succeeded':
            const asyncSession = event.data.object;
            console.log(`Async payment succeeded: ${asyncSession.id}`);
            await Paiment.update(
                { status: 'async_payment_succeeded' },
                { where: { sessionId: asyncSession.id } }
            );
            break;

        case 'checkout.session.async_payment_failed':
            const failedSession = event.data.object;
            console.log(`Async payment failed: ${failedSession.id}`);
            await Paiment.update(
                { status: 'async_payment_failed' },
                { where: { sessionId: failedSession.id } }
            );
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
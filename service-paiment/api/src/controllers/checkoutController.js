const Paiment = require('../models/paimentModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const dotenv = require('dotenv');
dotenv.config();

exports.createCheckout = async (req, res) => {
    try {
        const products = req.body.products;

        if (!products || products.length === 0) {
            return res.status(401).json({ error: 'Products array cannot be empty' });
        }

        const lineItems = products.map(product => {
            if (product.price <= 0 || product.quantity <= 0) {
                return res.status(401).json({ error: 'Price and quantity must be greater than 0' });
            }

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: product.name,
                        description: product.description || '',
                    },
                    unit_amount: product.total_price * 100,
                },
                quantity: product.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `http://${req.headers.host}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${req.headers.host}/cancel`,
        });

        // Enregistrer les informations de paiement dans la base de données
        await Paiment.create({
            sessionId: session.id,
            userId: req.params.id, 
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
    console.log('Received webhook');
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        // Utiliser req.body directement car express.raw est activé
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event: ${event.type}`);

    // Gérer les différents types d'événements Stripe
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

const Paiment = require('../models/paimentModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckout = async (req, res) => {
    try {
        const products = req.body.products;

        const lineItems = products.map(product => ( 
            {
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

        console.log(lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        await Paiment.create({
            userId: req.user.id,
            sessionId: session.id,
            status: 'created',
            amount_total: session.amount_total,
            currency: session.currency,
            payment_method_types: session.payment_method_types.join(','),
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
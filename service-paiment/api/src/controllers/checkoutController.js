require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

export const createCheckout = async (req, res) => {
    try {
        const products = req.body.products;

        const lineItems = products.map(product => ({
            price_data: {
                currency: 'eur', 
                product_data: {
                    name: product.name,
                    description: product.description,
                },
                unit_amount: product.price * 100, // le prix est en centimes
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
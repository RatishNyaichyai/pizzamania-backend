const express = require('express');
const router = express.Router();
const Order = require("../models/orderModel");



router.post('/placeorder', async (req, res) => {
    const { checkoutInfo, user, cartItems } = req.body;
    console.log('i am user', user[0])
    try {
        console.log('i am user', user[0])
        const Users = user[0];
        //const cart= cartItems[0];
        const newOrder = new Order({
            name: Users.name,
            email: Users.email,
            phoneNumber: checkoutInfo.number,
            userid: Users._id,
            orderitems: cartItems,
            shippingAddress: checkoutInfo.address,
            message: checkoutInfo.message,
            orderAmount: checkoutInfo.subTotal,
            isDelivered: false

        });
        console.log(newOrder)
        const insertOrder = await newOrder.save();
        console.log(insertOrder)
        res.status(200).json({
            success: true,
            message: 'Order success',
            data: insertOrder
        });

    } catch (error) {
        res.status(404).json({
            message: "Something went wrong"
        })
    }

    router.post('/getuserorder', async (req, res) => {
        console.log('succes u\order');
        const { userid } = req.body;
        console.log(userid)
        try {
            const orders = await Order.find({ userid })
            res.status(200).send(orders)
        } catch (error) {
            res.status(400).json({
                message: 'Something went Wrong',
                error: error.stack,
            });
        }
    })

})
module.exports = router;

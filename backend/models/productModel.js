import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        // REQUIRED
        // Relation between product and user
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },

        title: { type: String, required: true },

        description: { type: String, required: true },

        price: { type: Number, required: true, default: 0 },

        // OPTIONAL
        moreProperties: [
            {
                key: { type: String, required: true },
                value: { type: String, required: true },
            }
        ]

        
    },
    { timestamps: true },
)

// Save to collection products
const Product = mongoose.model('Product', productSchema)

export default Product
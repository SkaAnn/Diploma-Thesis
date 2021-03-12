import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        // REQUIRED
        // Relation between product and user
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        name: { type: String, required: true },

        description: { type: String, required: true },

        category: { type: Number, required: true, default: 0},
        
        price: { type: Number, required: true, default: 0 },

        active: { type: Boolean, required: true, default: true, },

        classification: { type: String, required: true },   // 3 options: supply, demand, donor

        condition: { type: String, required: true },   // 3 options: new, used, handmade

        countInStock: { type: Number, required: true, default: 1 },
        
        origin: { type: String, required: true },   // vyrobene v

        brand: { type: String },    // vyrobca

        images: [{ type: String }],

        size: { type: String },

        weight: { type: String },

        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],

        shipping: [     // informácie o dodaní, doprave
            {
                typ: { type: String, required: true },
                price: { type: String, required: true },
            }
        ],

        // OPTIONAL
        moreProperties: [
            {
                key: { type: String, required: true },
                val: { type: String, required: true },
            }
        ]


    },
    { timestamps: true },
)

// Save to collection products
const Product = mongoose.model('Product', productSchema)

export default Product
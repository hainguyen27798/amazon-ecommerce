import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { AbstractSchema } from '@/database/schemas/abstract.schema';
import { CartStatus } from '@/modules/cart/constants';
import { Product } from '@/modules/product/schemas/product.schema';
import { User } from '@/modules/user/schemas/user.schema';

const COLLECTION_NAME = 'carts';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ _id: false })
export class CartProduct {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: Product.name })
    product: User;

    @Prop({ required: true })
    quantity: number;
}

@Schema({ collection: COLLECTION_NAME, timestamps: true })
export class Cart extends AbstractSchema {
    @Prop({ type: String, required: true, enum: CartStatus })
    status: string;

    @Prop({ type: [CartProduct], required: true, default: [] })
    cartProducts: CartProduct[];

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: User.name })
    user: User;
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);

import Product from "../models/Product/Product";
import { Request, Response } from "express";
import { sendResponse } from "../utils/response";
import MyProduct from "../models/my-product/MyProduct";

const products = [
  {
    "name": "Alimento premium para perros",
    "description": "Bolsa de 5kg de alimento balanceado para perros adultos.",
    "price": 120.5,
    "category": "Alimento",
    "imageUrl": null,
    "status": true,
    "stock": 15,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846452d6c7303d6028b3f90"
  },
  {
    "name": "Juguete de goma para masticar",
    "description": "Juguete resistente ideal para perros medianos y grandes.",
    "price": 35.0,
    "category": "Juguetes",
    "imageUrl": null,
    "status": true,
    "stock": 40,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846509956eb4de310bc2ece"
  },
  {
    "name": "Collar ajustable para gatos",
    "description": "Collar de nylon con cascabel y cierre de seguridad.",
    "price": 18.0,
    "category": "Accesorios",
    "imageUrl": null,
    "status": true,
    "stock": 25,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846512e56eb4de310bc2ee7"
  },
  {
    "name": "Transportadora para mascotas",
    "description": "Caja transportadora plástica con ventilación y puerta metálica.",
    "price": 150.0,
    "category": "Transporte",
    "imageUrl": null,
    "status": true,
    "stock": 10,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846452d6c7303d6028b3f90"
  },
  {
    "name": "Cama acolchada para perros",
    "description": "Cama suave y lavable para perros pequeños.",
    "price": 85.0,
    "category": "Descanso",
    "imageUrl": null,
    "status": true,
    "stock": 20,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846509956eb4de310bc2ece"
  },
  {
    "name": "Peine para gatos",
    "description": "Peine de acero inoxidable para eliminar el pelo muerto.",
    "price": 22.0,
    "category": "Higiene",
    "imageUrl": null,
    "status": true,
    "stock": 35,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846512e56eb4de310bc2ee7"
  },
  {
    "name": "Comedero doble para perros",
    "description": "Tazón doble con soporte antideslizante.",
    "price": 30.0,
    "category": "Accesorios",
    "imageUrl": null,
    "status": true,
    "stock": 50,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846452d6c7303d6028b3f90"
  },
  {
    "name": "Rascador para gatos",
    "description": "Rascador vertical con cuerda de sisal.",
    "price": 70.0,
    "category": "Juguetes",
    "imageUrl": null,
    "status": true,
    "stock": 15,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846509956eb4de310bc2ece"
  },
  {
    "name": "Arena sanitaria para gatos",
    "description": "Bolsa de 10kg de arena absorbente.",
    "price": 40.0,
    "category": "Higiene",
    "imageUrl": null,
    "status": true,
    "stock": 25,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846512e56eb4de310bc2ee7"
  },
  {
    "name": "Chaleco reflectante para perros",
    "description": "Chaleco de seguridad para paseos nocturnos.",
    "price": 45.0,
    "category": "Accesorios",
    "imageUrl": null,
    "status": true,
    "stock": 12,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846452d6c7303d6028b3f90"
  },
  {
    "name": "Hueso de cuero prensado",
    "description": "Snack para perros que ayuda a limpiar los dientes.",
    "price": 15.0,
    "category": "Snacks",
    "imageUrl": null,
    "status": true,
    "stock": 60,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846509956eb4de310bc2ece"
  },
  {
    "name": "Cepillo de dientes para mascotas",
    "description": "Cepillo y pasta de dientes sabor pollo.",
    "price": 25.0,
    "category": "Higiene",
    "imageUrl": null,
    "status": true,
    "stock": 30,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846512e56eb4de310bc2ee7"
  },
  {
    "name": "Pelota con cuerda para perros",
    "description": "Juguete interactivo para jugar al aire libre.",
    "price": 28.0,
    "category": "Juguetes",
    "imageUrl": null,
    "status": true,
    "stock": 45,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846452d6c7303d6028b3f90"
  },
  {
    "name": "Bebedero automático para gatos",
    "description": "Fuente de agua con filtro de carbón.",
    "price": 95.0,
    "category": "Accesorios",
    "imageUrl": null,
    "status": true,
    "stock": 8,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846509956eb4de310bc2ece"
  },
  {
    "name": "Arnés acolchado para perros",
    "description": "Arnés ergonómico con correa reflectante.",
    "price": 55.0,
    "category": "Accesorios",
    "imageUrl": null,
    "status": true,
    "stock": 18,
    "supplier": "6846454d6c7303d6028b3f95",
    "owner_id": "6846512e56eb4de310bc2ee7"
  }
]

export const createProducts = async () => {
  try {
    
    const existingProducts = await Product.find();
    if (existingProducts.length > 0) {
      console.log("Productos de prueba ya existen, no se crearán nuevamente.");
      return;
    }

    await Product.insertMany(products);
    console.log("Productos de prueba creados exitosamente.");

  } catch (error) {
    console.log("Error al crear los productos de prueba:", error);
  }
}

export const addCartProduct = async (req: Request, res: Response) => {
  try {
    const { id_product } = req.body;
    const userId = req.userId;

    if (!userId) {
      return sendResponse({
        res,
        status: 400,
        message: "El ID del usuario es requerido",
      });
    }

    if (!id_product) {
      return sendResponse({
        res,
        status: 400,
        message: "El ID del producto es requerido",
      });
    }

    const existingCart = await MyProduct.findOneAndUpdate(
      { id_user: userId, status: true },
      { },
      { new: true, upsert: true }
    );

    if (existingCart) {
      existingCart.id_product?.push(id_product);
      await existingCart.save();
      return sendResponse({
        res,
        message: "Producto agregado al carrito exitosamente",
        data: existingCart,
      });
    }

    sendResponse({
      res,
      message: "Carrito creado y producto agregado exitosamente",
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al agregar el producto al carrito",
      error,
      status: 500,
    });
  }
};

export const buyCartProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return sendResponse({
        res,
        status: 400,
        message: "El ID del usuario es requerido",
      });
    }

    const cart = await MyProduct.find(
      { id_user: userId, status: true },
    );

    for (const item of cart) {
      item.status = false;
      await item.save();
    }

    sendResponse({
      res,
      message: "Compra realizada exitosamente",
      data: cart,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al realizar la compra",
      error,
      status: 500,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, supplier, price, category, imageUrl, stock } =
      req.body;
    const owner_id = req.userId;

    if (!owner_id) {
      return sendResponse({
        res,
        status: 400,
        message: "El ID del propietario es requerido",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      owner_id,
      supplier
    });

    await product.save();
    sendResponse({
      res,
      status: 201,
      message: "Producto creado exitosamente",
      data: product,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al crear el producto",
      error,
      status: 500,
    });
  }
};

export const getCartProducts = async (req: Request, res: Response) => {
  try {

    const userId = req.userId;
    
    if (!userId) {
      return sendResponse({
        res,
        status: 400,
        message: "El ID del usuario es requerido",
      });
    }

    const my_products = await MyProduct.findOne({ id_user: userId, status: true })
      .populate("id_product").lean();

    if (!my_products) {
      return sendResponse({
        res,
        data: [],
        message: "No se encontraron productos en el carrito",
      });
    }

    sendResponse({
      res,
      message: "Productos del carrito obtenidos exitosamente",
      data: my_products?.id_product,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al obtener los productos del carrito",
      error,
      status: 500,
    });
  }
}

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("owner_id", "name email");
    sendResponse({
      res,
      message: "Productos obtenidos exitosamente",
      data: products,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al obtener los productos",
      error,
      status: 500,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner_id",
      "name email"
    );
    if (!product) {
      return sendResponse({
        res,
        status: 404,
        message: "Producto no encontrado",
      });
    }
    sendResponse({
      res,
      message: "Producto obtenido exitosamente",
      data: product,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al obtener el producto",
      error,
      status: 500,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!product) {
      return sendResponse({
        res,
        status: 404,
        message: "Producto no encontrado",
      });
    }
    sendResponse({
      res,
      message: "Producto actualizado exitosamente",
      data: product,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al actualizar el producto",
      error,
      status: 500,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return sendResponse({
        res,
        status: 404,
        message: "Producto no encontrado",
      });
    }
    sendResponse({
      res,
      message: "Producto eliminado exitosamente",
      data: product,
    });
  } catch (error) {
    sendResponse({
      res,
      message: "Error al eliminar el producto",
      error,
      status: 500,
    });
  }
};

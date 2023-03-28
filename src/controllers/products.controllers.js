import { Producto } from '../models/Producto.model.js'
import { Categoria } from '../models/Categoria.model.js';

//gets all products
//obtiene todos los productos
export const getProducts = async (req, res) => {
  Producto.findAll().then(productos => {
    res.json({ code: 200, data: productos })
  }).catch(error => {
    res.json({ code: 500, message: "error al cargar los datos" })
  })
}
//obtiene el producto por id
export const getProductsById = async (req, res) => {
  try {
    let { id } = req.params
    let producto = await Producto.findByPk(id);
    res.status(200).json({code : 200 , data : producto})
  } catch (error) {
    res.status(500).json({code: 500 , message : "errpr al cargar los prductos"})
  }
}
//add un producto a la bd
export const addProductInventory = async (req, res) => {
  try {
    let { nombre, precio, stock, imagen, categoria, descripcion } = req.body;
    let fecha = new Date();
    let producto = await Producto.create({
      nombre_producto: nombre,
      precio: precio,
      stock: stock,
      imagen: imagen,
      id_categoria: categoria,
      descripcion: descripcion,
      fecha: fecha,
    });
    res.status(201).json({ code: 201, message: "Producto ingresado con éxito." });
  } catch (error) {
    console.error("Error details:", error); 
    res.status(500).json({ code: 500, message: "Error al guardar el producto." });
  }
};
//actualiza el producto seleccionado
export const updateProduct = async (req, res) => {
  try {
    let {id, nombre, precio, stock, imagen, categoria, descripcion } = req.body
    let productos  = await Producto.findByPk(id);
    console.log(productos)
    if(productos== null){
      res.status(400).json({ code: 400, message: "El producto que intenta actualizar no existe" })

    }else{
      let fecha = new Date();
      // console.log(nombre_producto, precio, stock, imagen, descripcion, fecha)
      let producto = await Producto.update({ nombre_producto : nombre, precio : precio, stock : stock, imagen : imagen, id_categoria : categoria, descripcion : descripcion, fecha:fecha },{
        where :{
          id : id
        }
      })
      res.status(201).json({ code: 201, message: "producto actualizado con exito." })
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: "Error al guardar el producto." })
  }
}
//elimina el producto seleccionado
export const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params
    let producto = await Producto.destroy({
      where: {
        id : id
      }
    });
    res.status(200).json({code : 200 , message : 'producto eliminado exitosamente'})
  } catch (error) {
    console.log(error)
    res.status(500).json({code: 500 , message : 'ha ocurrido un error al eliminar el producto'})
  }
}


// añade categoría
export const addCategory = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;
    const newCategory = await Categoria.create({ nombre_categoria });
    res.status(201).json({ code: 201, message: 'Categoría fue creada exitosamente.' });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Error mientras creaba la categoría.' });
  }
};



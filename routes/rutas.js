//requerimiento de express
const express = require("express");
const rutas = express.Router();
//requerimiento de modelo de productos
const producto = require("../models/producto");
//requerimiento de modelo de registros
const registros = require("../models/registro");

//Controladores
const {
  Creacion_De_Admin,
  Creacion_De_Usuario,
  Nuevo_Producto,
  Nuevo_registro,
} = require("../controllers/AllCreation");
const {
  Inicio_de_Sesion_Usuarios,
  Inicio_de_Sesion_Admins,
} = require("../controllers/Inicio_Sesion");
const { VerifyTokenUser } = require("../controllers/Verificaciones");
const {
  Busqueda,
  BusquedaTienda,
  objeto,
} = require("../controllers/busquedas");
const { editar_datos, restar, sumar } = require("../controllers/edicion");
const { eliminar, eliminar_registro } = require("../controllers/eliminar");
//JSONtoken
let token_actuall;

//Inventario
//Crear Producto
rutas.post("/CrearProducto", async (req, res) => {
  await Nuevo_Producto(req, res).then(async (resp) => {
    if (resp == false) {
      console.log("Error en creacion");
    } else {
      const Producto = await producto.find().lean();
      res.render("inventario", { Producto: Producto });
    }
  });
});
//Actualizar Producto
rutas.get("/Actualizar/:id", async (req, res) => {
  const Producto = await producto.findById(req.params.id).lean();
  res.render("Actualizar", { Producto });
});
rutas.post("/Actualizar/:id", async (req, res) => {
  await editar_datos(req, res)
    .then(async (nProducto) => {
      console.log(nProducto);
      const Producto = await producto.find().lean();
      console.log(Producto);
      res.render("inventario", { Producto: Producto });
    })
    .catch((err) => console.log(err));
});
//Eliminar Producto
rutas.get("/Eliminado/:id", async (req, res) => {
  await eliminar(req, res).then(async (resp) => {
    if (resp == false) {
      res.render("Err");
    } else {
      const Producto = await producto.find().lean();
      console.log(Producto);
      res.render("inventario", { Producto: Producto });
    }
  });
});
//Buscar
rutas.post("/Buscar", async (req, res) => {
  await Busqueda(req, res)
    .then((producto) => console.log(producto))
    .catch((err) => {
      console.log(err);
      res.render("Err");
    });
});

//Tienda
//Buscar
rutas.post("/BuscarT", async (req, res) => {
  await BusquedaTienda(req, res)
    .then((producto) => console.log(producto))
    .catch((err) => {
      console.log(err);
      res.render("Err");
    });
});
//Agregar al carrito
rutas.get("/Agregar/:id", async (req, res) => {
  await objeto(req, res).then(async (resp) => {
    await Nuevo_registro(resp.nombre, resp.tipo, resp.marca, resp.descripcion, resp.existencia, resp.precio).then(async (respp) => {
      if (respp == false) {
        res.render("Err");
      } else {
        restar(req, res);
        const Producto = await producto.find().lean();
        const Registro = await registros.find().lean();
        res.render("Tienda", { Registro, Producto });
      }
    });
  });
});
/* rutas.get('/Quitado/:pos',(req,res)=>{
	console.log("haber"+req.params.pos)
	Producto_carrito.forEach(index => {
		if (index._id == `new ObjectId(${req.params.pos})`) {
			Producto_carrito.splice(Producto_carrito.indexOf(index),1)
		}
	})
	async()=>{
		const Producto = await producto.find().lean();
		console.log(Producto_carrito);
		res.render("tienda",{Producto_carrito, Producto})
	}

}) */

//Rutas Finales
rutas.get("/", (req, res) => {
  res.render("principal");
});
//Admin
rutas.post("/Inventario", async (req, res) => {
  await Creacion_De_Admin(req, res).then(async (resp) => {
    if (resp == false) {
      console.log("Error en creacion");
    } else {
      token_actuall = resp;
      const Producto = await producto.find().lean();
      res.render("inventario", { Producto: Producto });
    }
  });
  console.log(`El token de inicio de sesion es ${token_actuall}`);
});
rutas.post("/Inventarios", async (req, res) => {
  await Inicio_de_Sesion_Admins(req, res).then(async (resp) => {
    if (resp == false) {
      console.log("No iniciaste sesion");
      res.render("Err");
    } else {
      token_actuall = resp;
      const Producto = await producto.find().lean();
      res.render("inventario", { Producto: Producto });
    }
  });
  console.log(`El token de inicio de sesion es ${token_actuall}`);
});
//Cliente
rutas.post("/Tienda", async (req, res) => {
  await Creacion_De_Usuario(req, res).then(async (resp) => {
    if (resp == false) {
      console.log("Error en creacion");
    } else {
      token_actuall = resp;
      const Producto = await producto.find().lean();
      res.render("tienda", { Producto: Producto });
    }
  });
  console.log(`Token actual es ${token_actuall}`);
});
rutas.post("/Tiendas", async (req, res) => {
  await Inicio_de_Sesion_Usuarios(req, res).then(async (resp) => {
    if (resp == false) {
      console.log("No iniciaste sesion");
      res.render("Err");
    } else {
      token_actuall = resp;
      const Producto = await producto.find().lean();
      res.render("tienda", { Producto: Producto });
    }
  });
  console.log(`El token de inicio de sesion es ${token_actuall}`);
});

rutas.get("/pruebadeverificacion", async (req, res) => {
  await VerifyTokenUser(token_actuall).then((resp) => {
    if (resp == false) {
      console.log("token expired or invalid");
    } else {
      console.log("Valid Token Nice");
    }
  });
});
//exportacion
module.exports = rutas;

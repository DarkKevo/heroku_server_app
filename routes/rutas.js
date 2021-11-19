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
const { VerifyTokenUser, VerifyTokenAdmin } = require("../controllers/Verificaciones");
const {
  Busqueda,
  BusquedaTienda,
  objeto,
} = require("../controllers/busquedas");
const { editar_datos, restar, sumar } = require("../controllers/edicion");
const { eliminar, eliminar_registro } = require("../controllers/eliminar");
//JSONtoken
let token_actuall;

//Midlle
rutas.all('/kevoshop',async(req,res,next)=>{
  /* await VerifyTokenAdmin(token_actuall).then((resp) => {
    if (!resp) {
      console.log("token expired or invalid");
      
    } else {
      console.log("Valid Token Nice");
      
    }
  }); */
  console.log('Todo nices')
  next();
})

//Inventario
//Crear Producto
rutas.post("/kevoshop", async (req, res) => {
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
  restar(req, res);
  await objeto(req, res).then(async (resp) => {
    await Nuevo_registro(resp.nombre, resp.tipo, resp.marca, resp.descripcion, resp.existencia, resp.precio).then(async (respp) => {
      if (respp == false) {
        res.render("Err");
      } else {
        const Producto = await producto.find().lean();
        const Registro = await registros.find().lean();
        res.render("Tienda", { Registro, Producto });
      }
    });
  });
});
rutas.get('/Quitado/:id',(req,res)=>{
	sumar(req,res);
  eliminar_registro(req,res)
	.then(async(resp)=>{
		if(!resp){

    } else {
    const Producto = await producto.find().lean();
    const Registro = await registros.find().lean();
		res.render("tienda",{Registro, Producto})
    }
	})

}) 

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

rutas.get("/Logout",(req, res) => {
  token_actuall= false;
  res.render("principal");
});
rutas.get("/pruebadeverificacion", async (req, res) => {
  await VerifyTokenUser(token_actuall).then((resp) => {
    if (!resp) {
      console.log("token expired or invalid");
      res.end()
    } else {
      console.log("Valid Token Nice");
      res.end()
    }
  });

});
//exportacion
module.exports = rutas;


const conexion = require("../database");

function buscarUsuario(usuario, callback) {
    const sql = `
        SELECT id_usuario, usuario, contrasena
        FROM usuarios
        WHERE usuario = ?
        LIMIT 1
    `;

    conexion.query(sql, [usuario], (error, resultados) => {
        if (error) {
            return callback(error, null);
        }

        if (resultados.length === 0) {
            return callback(null, null);
        }

        callback(null, resultados[0]);
    });
}

module.exports = {
    buscarUsuario
};

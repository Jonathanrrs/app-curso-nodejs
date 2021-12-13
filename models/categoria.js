const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        /* para hacer la relación con el usuario */
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function () {
    const {__v, estado, password, ...data} = this.toObject();
    return data;
}

module.exports = model('Categoria', CategoriaSchema);
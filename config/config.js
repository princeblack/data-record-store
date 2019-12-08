const {env} = process;
console.log(env.NODE_ENV);

const config = {
    env : env.NODE_EV || 'developemnt'
}

const devConfig  = {
    db: 'mongodb://localhost:27017/data-record-store',
    jwt_key : 'babylone'
};
const prodConfig  = {
    db: 'mongodb+srv://mahamadi:africa@ds-record-lp1ce.mongodb.net/test?retryWrites=true&w=majority',
    jwt_key : 'babylone'
};

const currentConfig = config.env === 'production' ? prodConfig : devConfig;
console.log(Object.assign({},config,currentConfig));
module.exports = Object.assign({},config,currentConfig);

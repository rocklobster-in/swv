const middlewares = [];

export const registerMiddleware = middleware => {
	middlewares.push( middleware );
};

export const applyMiddlewares = vanilla => {
	return [ ...middlewares ].reduce(
		( next, middleware ) => {
			return args => middleware( args, next );
		},
		vanilla
	);
};

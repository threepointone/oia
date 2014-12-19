oi(
	lets [prn] 
		(do
			(prn (.getIn {x 1 y [1 5 6]} ['y' 1]))
			(.forEach [$ 1 4 6] prn))		
);



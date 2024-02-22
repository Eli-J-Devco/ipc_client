import { toast } from 'react-toastify';
var LibToast = {};

/**
 * string
 * @param str
 * @returns
 */
LibToast.toast = (message, type, pos = "top-right") => {
	let posistion = "top-right";
	if (typeof pos != 'undefined') {
		posistion = pos;
	}
	switch (type) {
		case "info":
			toast.info(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
		case "error":
			toast.error(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
		case "warn":
			toast.warn(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
		case "expired":
			toast.warn(message, {
				position: posistion,
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
	}
};

export default LibToast;



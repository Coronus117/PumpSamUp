// import React from "react";
// import * as ReactModal from "react-modal";

// const Header = ({ children, className }) => (
//   <div
//     className={`relative flex flex-row items-center justify-center p-6 ${className}`}
//   >
//     {children}
//   </div>
// );

// const Body = ({ children, className }) => (
//   <div id="modal-body" className={`overflow-y-auto ${className}`}>
//     {children}
//   </div>
// );

// const Footer = ({ children, className }) => (
//   <div
//     className={`py-3 px-6 ${className}`}
//     style={{
//       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
//       border: "1px solid #E7ECF0",
//     }}
//   >
//     {children}
//   </div>
// );

// const Modal = ({
//   children,
//   title,
//   open,
//   requestClose,
//   closeOnEsc,
//   closeOnOverlay,
//   maxWidth,
// }) => (
//   <ReactModal
//     contentLabel={title}
//     overlayClassName="bg-black bg-opacity-75 fixed inset-0 z-50 flex items-end lg:items-center"
//     className={`modal-content ${
//       maxWidth ? "modal-content-big" : "modal-content-small"
//     }`}
//     isOpen={open}
//     onRequestClose={requestClose}
//     shouldCloseOnEsc={closeOnEsc}
//     shouldCloseOnOverlayClick={closeOnOverlay}
//   >
//     {children}
//   </ReactModal>
// );

// Modal.Header = Header;
// Modal.Body = Body;
// Modal.Footer = Footer;

// export default Modal;

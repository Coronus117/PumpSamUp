import MainHeader from "./main-header";

function Layout(props) {
  return (
    <div className="bg-gray-100 container mx-auto">
      <MainHeader />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;

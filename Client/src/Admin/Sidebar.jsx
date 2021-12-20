import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="flex-column sidebar-sticky"
    >
      <Nav>
        <Nav.Item>
          <Nav.Link href="/admin/pending">Pending Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="">Manage Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="">Manage Users</Nav.Link>
        </Nav.Item>
      </Nav>
    </Nav>
  );
};

export default Sidebar;

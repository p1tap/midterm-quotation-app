import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";
// test
const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price)

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value),
    };

    const existingItemIndex = dataItems.findIndex(
      (dataItem) =>
        dataItem.item === newItem.item && dataItem.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex].qty += newItem.qty;
      updatedItems[existingItemIndex].discount += newItem.discount;
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearItems = () => {
    setDataItems([]);
  }

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  }

  return (
    <Container>
      <Row>
        <Col md={8} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Items
              <Form.Select ref={itemRef} onChange={productChange}>
                {
                  products.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control type="number" ref={ppuRef} value={ppu} onChange={e => setPpu(parseFloat(e.target.value))} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearItems={clearItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

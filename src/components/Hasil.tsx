import React from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import numberWithCommas from "../utils/Utils";

export default function Hasil({ keranjangs }: any) {
  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {keranjangs.length !== 0 && (
        <ListGroup variant="flush">
          {keranjangs.map((keranjangMenu: any) => (
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                <h4>
                  <Badge pill bg="success">
                    {keranjangMenu.jumlah}
                  </Badge>
                </h4>
                </Col>
                <Col>
                  <h5>{keranjangMenu.product.nama}</h5>
                  <p>Rp. {numberWithCommas(keranjangMenu.product.harga)}</p>
                </Col>
                <Col>
                <strong className="float-right">

                Rp. {numberWithCommas(keranjangMenu.total_harga)}
                </strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
}

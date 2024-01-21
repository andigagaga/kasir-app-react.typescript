import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }: any) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} />;

  return <FontAwesomeIcon icon={faUtensils} />;
};

type CategoriesProps = {
  id: number;
  nama: string;
};

type ListCategoriesProps = {
  selectedCategory: string | null;
  handleChangeCategory: (category: string) => void;
};

 const ListCategories:React.FC<ListCategoriesProps> =({
  selectedCategory,
  handleChangeCategory,
}) => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const handleGetCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Daftar Categories</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              style={{ cursor: 'pointer' }}
              className={`d-flex justify-content-center ${
                selectedCategory === category.nama ? "bg-primary text-warning" : ""
              }`}
              onClick={() => handleChangeCategory(category.nama)}
            >
              <h5 className="p-2  gap-2 d-flex">
                <Icon nama={category.nama} />
                {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}

export default ListCategories
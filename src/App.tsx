import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menu, NavbarComponents } from "./components";
import { API_URL } from "./utils/Constants";
import axios from "axios";
import swal from "sweetalert";

type MenuProps = {
  id: number;
  nama: string;
};

export default function App() {
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [keranjangs, setKeranjangs] = useState([]);

  const handleGetMenus = async (category: string | null = null) => {
    try {
      const response = await axios.get(
        `${API_URL}/products?category.nama=${selectedCategory}`,
        {
          params: {
            category: category || undefined, // Pass category only if it's not null
          },
        }
      );
      setMenus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetKeranjang = async () => {
    try {
      const response = await axios.get("http://localhost:4000/keranjangs");
      setKeranjangs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const masukKeranjang = async (value: any) => {
    try {
      const response = await axios.get(
        `${API_URL}/keranjangs?product.id=${value.id}`
      );

      if (response.data.length === 0) {
        // Jika produk belum ada di keranjang, tambahkan sebagai item baru
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        try {
          await axios.post(`${API_URL}/keranjangs`, keranjang);
          swal({
            title: "Berhasil...",
            text: "Sukses masuk keranjang",
            icon: "success",
            timer: 1500,
          });
        } catch (error) {
          console.log("masuk keranjang error", error);
        }
      } else {
        // Jika produk sudah ada di keranjang, perbarui jumlah dan total harga
        const existingKeranjang = response.data[0];
        const updatedKeranjang = {
          jumlah: existingKeranjang.jumlah + 1,
          total_harga: existingKeranjang.total_harga + value.harga,
          product: existingKeranjang.product,
        };

        try {
          await axios.put(
            `${API_URL}/keranjangs/${existingKeranjang.id}`,
            updatedKeranjang
          );
          swal({
            title: "Berhasil...",
            text: `Sukses masuk keranjang ${value.nama}`,
            icon: "success",
            timer: 1500,
          });
        } catch (error) {
          console.log("masuk keranjang error", error);
        }
      }
      handleGetKeranjang();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMenus();
    handleGetKeranjang();
  }, [selectedCategory]); // Tambahkan dependency array kosong

  console.log("keranjangs", keranjangs);

  return (
    <div>
      <NavbarComponents />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              selectedCategory={selectedCategory}
              handleChangeCategory={setSelectedCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

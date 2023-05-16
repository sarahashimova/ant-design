import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table,Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./supplier.css";


function Antpage() {
    const [products, setproducts] = useState([]);
    const { confirm } = Modal;

    const deleteProduct = (id) => {
        confirm({
          title: "Do you Want to delete these items?",
          icon: <ExclamationCircleFilled />,
          content: "Some descriptions",
          onOk() {
            axios
              .delete("https://northwind.vercel.app/api/suppliers/" + id)
              .then((data) => {
                axios.get('https://northwind.vercel.app/api/suppliers')
                .then(res => {
                    setproducts(res.data);
                })
              });
          },
          onCancel() {
            console.log("Cancel");
          },
        })
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            sorter: (a,b) => a.companyName.localeCompare(b.companyName)
        },
        {
            title: 'Contact Name',
            dataIndex: 'contactName',
            key: 'contactName',
            sorter: (a,b) => a.unitPrice - b.unitPrice
        },
        {
            title: 'City',
            dataIndex: 'address',
            key: 'city',
            render: (text, record) => <span>{record.address?.city}</span>
        },
        {
            title:"Delete",
            dataIndex:"id",
            key:"id",
            render:(id) => (
                <Button onClick={() => deleteProduct(id)} type="primary" danger>
                    Delete
                </Button>
            )
        }
    ];

    useEffect(() => {

        axios.get('https://northwind.vercel.app/api/suppliers')
            .then(res => {
                setproducts(res.data);
            })
    }, []);

    const rowClass = (record) => {
        if(record.address?.city == "Boston") {
            return "tomato"
        }
    }


    return (<>
        <Table
            dataSource={products}
            columns={columns}
            rowClassName={rowClass}
            pagination={
                {
                    pageSize:5
                }
            }
        />
    </>)
}

export default Antpage;
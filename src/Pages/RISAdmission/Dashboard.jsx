import React from 'react'
import { Button, Container, Alert } from 'react-bootstrap';
import { Card, Form, Input } from "antd";
import { RiSpeakAiFill } from "react-icons/ri";
import { FaMicroscope } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { LaptopOutlined, BookOutlined, MedicineBoxOutlined, BgColorsOutlined } from '@ant-design/icons';


const Dashboard = () => {
    const [form] = Form.useForm();

    return (
        <main>
            <div className='container py-3'>
                <div className='row justify-content-between  align-item-center'>
                    <div className='col-md-2 text-start col-5'>
                        <span className='text-primary fw-bold'>RIS</span> Admission
                    </div>
                    <div className='col-md-3 text-end col-7'>
                        <span className='small'>Enrollement Open for 2024-25</span>
                    </div>
                </div>

            </div>

            <section className='banner  py-5 overlay'>
                <div className='container py-2' style={{ zIndex: "9" }}>
                    <div className='row justify-content-center'>
                        <div className="col-md-10 ">
                            <div className='row  align-items-center'>
                                <div className='col-md-6 text-white '>
                                    <div className='mx-4 mt-4'>
                                        <h6 className='text-warning'>LIMITED SEATS FOR 2024-25</h6>
                                        <h1 className='fw-bolder py-3'>Unlock Your Child's Full Potential</h1>
                                        <p>The Top **CBSE School in Malad** built on Holistic, Concept-Driven Education. Download our Official Prospectus</p>
                                    </div>
                                </div>
                                <div className='col-md-5 offset-md-1 '>
                                    <div className='px-3 py-3 text-center bg-white rounded mx-4'>
                                        <h4>Secure Your Spot Now!</h4>
                                        <p>Get Instant Prospectus & Schedule & School Tour</p>
                                        <Form form={form}>
                                            <Form.Item
                                                // label="Parent Name"
                                                placeholder="Parent Name"
                                                name="parentName"
                                                rules={[
                                                    { required: true, message: "Please enter parent name" },
                                                ]}
                                            >
                                                <Input placeholder="Enter your name" />
                                            </Form.Item>
                                            <Form.Item
                                                // label="Email Address"
                                                placeholder="Email Address"
                                                name="email"
                                                rules={[
                                                    { required: true, message: "Please enter email address" },
                                                ]}
                                            >
                                                <Input placeholder="Enter your email" />
                                            </Form.Item>
                                            <Form.Item
                                                // label="Mobile Number"
                                                placeholder="Mobile Number"
                                                name="mobile"
                                                rules={[
                                                    { required: true, message: "Please enter mobile number" },
                                                ]}
                                            >
                                                <Input placeholder="Enter your Mobile Number" />
                                            </Form.Item>
                                            <Form.Item
                                                // label="Grade"
                                                placeholder="Select Grade"
                                                name="mobile"
                                                rules={[
                                                    { required: true, message: "Please enter Grade" },
                                                ]}
                                            >
                                                <Input placeholder="Enter your Grade" />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button className='bg-success text-white border-0' type="primary" htmlType="submit" block>
                                                    GET ADDMISSION INFO NOW
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className='py-3 pt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-12">
                            <div className='container text-center pb-5'>
                                <h2 className='fw-bolder'>The Rejoice **3E Learning Advantage**</h2>
                                <p>Our foundation is built on Holistic Education: **Explore, Experience, Express**</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row text-center justify-content-around">
                                <div className="col-3 shadow p-0 bg-white rounded">
                                    <Card variant="borderless">
                                        <div className='fs-3 pb-3'><FaMicroscope /></div>
                                        <h4>Explore</h4>
                                        <p>Learning starts with sensory exploration of environment, encouraging **natural curiosity** and self discovery in every subject</p>
                                    </Card>
                                </div>
                                <div className="col-3 shadow p-0 bg-white rounded">
                                    <Card variant="borderless">
                                        <div className='fs-3 pb-3'><FaTools /></div>
                                        <h4>Experience</h4>
                                        <p>Hands-on projects and real-world application replace rote memorization, boosting **knowledge recall** and practical skills.</p>
                                    </Card>
                                </div>
                                <div className="col-3 shadow p-0 bg-white rounded">
                                    <Card variant="borderless">
                                        <div className='fs-3 pb-3'><RiSpeakAiFill /></div>
                                        <h4>Express</h4>
                                        <p>Fostering self-expression and dynamic knowledge sharing ensures every child develops **confidence** and finds their unique voice.</p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className='text-center py-5'>
                                <button className='p-2 rounded-5 px-4 bg-white text-primary border-primary fw-bolder'>DISCOVER OUR CBSE ACADEMIC PROGRAM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-1 comments'>
                <div className='container pb-3'>
                    <div className='row'>
                        <div className='col-12 conatiner pb-4'>
                            <div className='text-center fw-bolder pt-5'>
                                <h2>Trusted by Parents, Accredated for Excellence</h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 ps-5 ">
                                    <div className='shadow card-border'>
                                        <Card variant='borderless rounded-5'>
                                            <p className='small'>"The focus on concept teaching rather than rote learning has made a tremendous improvement in my child in just two months! Highly recommend Rejoice International School."
                                            </p>
                                            <p className='fw-bolder mb-0'><span>—</span> Mrs. Mandavia, Parent (Grade 7)</p>
                                        </Card>
                                    </div>
                                </div>
                                <div className="col-6 pe-5">
                                    <div className='shadow card-border-blue'>
                                        <Card variant='borderless rounded-5'>
                                            <p className='small pe-5'>"I am extremely happy and satisfied. My daughters are able to freely express and explore opportunities for themselves. The experience here is very professional."
                                            </p>
                                            <p className='fw-bolder mb-0'><span>—</span> Mr. Rizvi, Parent</p>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 container">
                            <div className='text-center py-4 fw-bold'>
                                <p><span className='text-primary pe-3'>CBSE Affiliated</span><span className='text-secondary'>|</span><span className='text-danger ps-3'>1500+ Happy Students</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-1'>
                <div className="container">
                    <div className='row'>
                        <div className="col-12 container">
                            <div className='text-center fw-bolder py-4'>
                                <h2>A Campus Designed for Holistic Growth</h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row text-center">
                                <div className="col-3">
                                    <Card className='h-100 rounded-3 border shadow-sm'>
                                        <div className='fs-3 pb-3 mb-0'><LaptopOutlined /></div>
                                        <p className='fw-bolder fs-6'>ICT lab & technology</p>
                                        <p className=' mb-0'>Future-Ready skills training in smart, advanced classrooms.</p>
                                    </Card>
                                </div>
                                <div className="col-3">
                                    <Card className='h-100 rounded-3 border shadow-sm'>
                                        <div className='fs-3 pb-3 mb-0'><BookOutlined /></div>
                                        <p className='fw-bolder fs-6'>Library & Resource Center</p>
                                        <p className=' mb-0'>Vast resouce to inspire curiosity and deep research amoung students.</p>
                                    </Card>
                                </div>
                                <div className="col-3">
                                    <Card className='h-100 rounded-3 border shadow-sm'>
                                        <div className='fs-3 pb-3 mb-0'><MedicineBoxOutlined /></div>
                                        <p className='fw-bolder fs-6'>Medical Room</p>
                                        <p className=' mb-0'>Safe, hygenic environment with dedicated medical assistance.</p>
                                    </Card>
                                </div>
                                <div className="col-3">
                                    <Card className='h-100 rounded-3 border shadow-sm'>
                                        <div className='fs-3 pb-3 mb-0'><BgColorsOutlined /></div>
                                        <p className='fw-bolder fs-6 text-center'>Co-Curricular Activities</p>
                                        <p className=' mb-0'>Dedicated Dance, Art and Multipurpose activity spaces.</p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard
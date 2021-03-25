import React, { useState } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { Table } from 'react-bootstrap'
import Message from '../components/Message'

const TabsDefault = ({ product }) => {
    const [activeItem, setActiveItem] = useState('1');

    const toggle = tab => e => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
    };

    return (
        <MDBContainer>
            <MDBNav className="nav-tabs mt-5">
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItem === '1'} onClick={toggle("1")} role="tab" >
                        Popis
            </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItem === '2'} onClick={toggle("2")} role="tab" >
                        Špecifikácia
            </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeItem === '3'} onClick={toggle("3")} role="tab" >
                        Doprava a doručenie
                        {/* poštovné */}
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
                    <p className="mt-3 px-1 text-justify">
                        {product.description}
                    </p>
                </MDBTabPane>


                <MDBTabPane tabId="2" role="tabpanel">
                    { product.moreProperties.length === 0 ?  <Message variant='info'>Tato cast je prazdna</Message>
                            :
                            <Table striped size='sm' className='mt-3'>
                                <tbody>
                                    {product.moreProperties.map((item) =>
                                        <tr>
                                            <td>{item.key}</td>
                                            <td>{item.val}</td>
                                        </tr>
                                    )}
                                    {/* <tr>
                                <td>farba</td>
                                <td>zelena</td>
                            </tr>
                            <tr>
                                <td>material</td>
                                <td>kov</td>
                            </tr>
                            <tr>
                                <td>vaha</td>
                                <td>120g</td>
                            </tr>
                            <tr>
                                <td>rozmery</td>
                                <td>10x100 cm</td>
                            </tr> */}
                                </tbody>
                            </Table>
                    }
                </MDBTabPane>


                <MDBTabPane tabId="3" role="tabpanel">
                    <p className="mt-2">
                        Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                        voluptate odit minima. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Nihil odit magnam minima,
                        soluta doloribus reiciendis molestiae placeat unde eos
                        molestias.
            </p>
                </MDBTabPane>
            </MDBTabContent>
        </MDBContainer>
    );

}
export default TabsDefault;
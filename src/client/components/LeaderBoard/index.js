import React from 'react';
import axios from 'axios';
import "./Leaderboard.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge } from "reactstrap";
import {useState, useEffect} from 'react';
import { IoIosPodium } from "react-icons/io";

const LeaderBoard = () => {
    const [data1, setData] = useState(null);
    const [modal, setModal] = useState(false);

    const fetchTop = () => {
        axios.post("/api/getTop")
        .then(res => {
            setData(res.data)
            console.log(res)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchTop()
    }, [ modal]);
    const openModal = () => {
        setModal(!modal)
    }

    const closeModal = () => {
        setModal(false)
    }
    return (
            <div>
                <button className="openButton" onClick={openModal}>
                    <span className="desktop-msg">Top Students</span>
                </button>
                <Modal isOpen={modal} toggle={closeModal}>
                    <ModalHeader><div className="modal1"><div>Top</div><button className="cbutton" onClick={closeModal}>Close</button></div></ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {data1 ? data1.map(x => {
                                return (
                                    <ListGroupItem key={x.name}>
                                        {x.name}
                                        <Badge className="scoreBadge">{x.score}</Badge>
                                    </ListGroupItem>
                                );
                            }) : console.log("end")}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button className="closeButton" onClick={closeModal}>Close</button>
                    </ModalFooter>
                </Modal>
            </div>
    )
}

export default LeaderBoard;
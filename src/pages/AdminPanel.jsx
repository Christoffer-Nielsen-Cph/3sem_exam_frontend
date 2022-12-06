import React, {useEffect, useState} from 'react';
import "../styles/AdminPanel.css";
import userFacade from "../utils/userFacade.js";

function AdminPanel({trainingFacade}) {
    const [training, setTraining] = useState([]);
    const [edit, setEdit] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [create, setCreate] = useState(false);
    const [viewUsers, setViewUsers] = useState(0);
    useEffect(() => {
        const getData = async () => {
            trainingFacade.getAllTrainingSessions((data) => {
                setTraining(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    if(userFacade.hasUserAccess("admin", true)){
    return (
        <div>
            <h1 className={"myBody"}>TRAINING SESSION SCHEDULE</h1>
            {create ? (
                <div>
                    <button onClick={() => {
                        setCreate(false)
                    }}>Cancel
                    </button>

                    <form onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Full address</th>
                                <th>Category</th>
                                <th>Participants</th>
                                <th>Create</th>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder={"Title"} value={inputs.title}
                                           onChange={handleChange} name={"title"}/></td>
                                <td><input type="text" placeholder={"Time"} value={inputs.time} onChange={handleChange}
                                           name={"time"}/></td>
                                <td><input type="text" placeholder={"Date"} value={inputs.date} onChange={handleChange}
                                           name={"date"}/></td>
                                <td><input type="text" placeholder={"Full address"} value={inputs.fullAddress}
                                           onChange={handleChange} name={"fullAddress"}/></td>
                                <select name="category" onChange={handleChange}>
                                    <option disabled={true} selected={true}>Choose category</option>
                                    <option value="1">Tighten up</option>
                                    <option value="2">Pilates</option>
                                    <option value="3">Yoga</option>
                                    <option value="4">Bike Power</option>
                                    <option value="5">Dance</option>
                                    <option value="6">Crossfit</option>
                                    <option value="7">Zumba</option>
                                    <option value="8">Weight lifting</option>
                                    <option value="9">Boxing</option>
                                    <option value="10">Circle training</option>
                                    <option value="11">Endurance training</option>
                                </select>

                                <td><input type="number" placeholder={"Max participants"} value={inputs.maxParticipants}
                                           onChange={handleChange} name={"maxParticipants"}/></td>
                                <td>
                                    <button onClick={() => {
                                        const json = {
                                            "title": inputs.title,
                                            "time": inputs.time,
                                            "date": inputs.date,
                                            "fullAddress": inputs.fullAddress,
                                            "category": {
                                                "id": inputs.category
                                            },
                                            "maxParticipants": inputs.maxParticipants
                                        }
                                        trainingFacade.createTrainingSession(json).then(() => {
                                            setRefresh(!refresh);
                                            setCreate(false)
                                        });
                                    }}>Submit
                                    </button>
                                </td>
                                <td>

                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            ) : (
                <button onClick={() => {
                    setCreate(true)
                }}>Create training session</button>
            )}

            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Full address</th>
                        <th>Category</th>
                        <th>Participants</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                    {training.map((data) => {
                        if (edit == data.id) {
                            return (
                                <tr key={data.id}>
                                    <td><input type="text" placeholder={"Title"} value={inputs.title}
                                               onChange={handleChange} name={"title"}/></td>
                                    <td><input type="text" placeholder={"Time"} value={inputs.time}
                                               onChange={handleChange} name={"time"}/></td>
                                    <td><input type="text" placeholder={"Date"} value={inputs.date}
                                               onChange={handleChange} name={"date"}/></td>
                                    <td><input type="text" placeholder={"Full address"} value={inputs.fullAddress}
                                               onChange={handleChange} name={"fullAddress"}/></td>
                                    <select name="category" onChange={handleChange}>
                                        <option disabled={true} selected={true}>Choose category</option>
                                        <option value="1">Tighten up</option>
                                        <option value="2">Pilates</option>
                                        <option value="3">Yoga</option>
                                        <option value="4">Bike Power</option>
                                        <option value="5">Dance</option>
                                        <option value="6">Crossfit</option>
                                        <option value="7">Zumba</option>
                                        <option value="8">Weight lifting</option>
                                        <option value="9">Boxing</option>
                                        <option value="10">Circle training</option>
                                        <option value="11">Endurance training</option>
                                    </select>

                                    <td><input type="number" placeholder={"Max participants"}
                                               value={inputs.maxParticipants} onChange={handleChange}
                                               name={"maxParticipants"}/></td>
                                    <td>
                                        <button onClick={() => {
                                            const json = {
                                                "id": data.id,
                                                "title": inputs.title,
                                                "time": inputs.time,
                                                "date": inputs.date,
                                                "fullAddress": inputs.fullAddress,
                                                "category": {
                                                    "id": inputs.category
                                                },
                                                "maxParticipants": inputs.maxParticipants
                                            }
                                            console.log(json)
                                            trainingFacade.updateTrainingSession(json).then(() => {
                                                setRefresh(!refresh)
                                            });
                                            setEdit(0)
                                        }}>Submit
                                        </button>
                                    </td>
                                    <td>

                                    </td>
                                </tr>

                            );
                        } else {
                            return (
                                <>
                                    <tr key={data.id}>
                                        <td>{data.title}</td>
                                        <td>{data.time}</td>
                                        <td>{data.date}</td>
                                        <td>{data.fullAddress}</td>
                                        <td>{data.category.categoryName}</td>
                                        <td><button onClick={() => {setViewUsers(data.id)}}>{data.users.length}/{data.maxParticipants}</button></td>
                                        <td>
                                            <button onClick={() => {
                                                setEdit(data.id);
                                            }}>Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                trainingFacade.deleteTrainingSession(data.id).then(() => {
                                                    setRefresh(!refresh);
                                                });

                                            }}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                    {data.users.map((user) => {
                                        {if(data.id == viewUsers){
                                            return (
                                                <>
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                        <th>Zip</th>
                                                        <th>City</th>
                                                        <th><button onClick={() => {setViewUsers(0)}}>Close</button></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>

                                                    <tr>
                                                        <td>{user.userName}</td>
                                                        <td>{user.userEmail}</td>
                                                        <td>{user.address.streetAddress}</td>
                                                        <td>{user.address.cityInfo.zipCode}</td>
                                                        <td>{user.address.cityInfo.cityName}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </>
                                                );
                                        }}
                                    })}
                                </>
                            );
                        }
                    })}
                </table>
            </form>
        </div>
    );
    }
}

//{data.fullAddress}


export default AdminPanel;
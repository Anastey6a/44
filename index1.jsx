import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState({});
    const [photos, setPhotos] = useState({});

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const fetchAlbums = (userId) => {
        axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(response => {
                setAlbums(prevAlbums => ({
                    ...prevAlbums,
                    [userId]: response.data
                }));
            })
            .catch(error => console.error('Error fetching albums:', error));
    };

    const fetchPhotos = (albumId) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => {
                setPhotos(prevPhotos => ({
                    ...prevPhotos,
                    [albumId]: response.data
                }));
            })
            .catch(error => console.error('Error fetching photos:', error));
    };

    return (
        <div>
            <h1>Список користувачів</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>{user.name}</p>
                        <button onClick={() => fetchAlbums(user.id)}>Album</button>
                        {albums[user.id] && (
                            <ul>
                                {albums[user.id].map(album => (
                                    <li key={album.id}>
                                        <p>{album.title}</p>
                                        <button onClick={() => fetchPhotos(album.id)}>Photos</button>
                                        {photos[album.id] && (
                                            <ul>
                                                {photos[album.id].map(photo => (
                                                    <li key={photo.id}>
                                                        <img src={photo.thumbnailUrl} alt={photo.title} />
                                                        <p>{photo.title}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity, Alert } from 'react-native';

const ContainerItems = ({ name, email, sector, onPress, onDeleted }) => {
    return (
        <View>
            <View style={styles.containerItem}>
                <TouchableOpacity onPress={onPress}>
                    <Image style={styles.avatar} source={{ uri: `https://i.pravatar.cc/150?u=${email}.comhttps://i.pravatar.cc/150?u=${email}.com` }} />
                </TouchableOpacity>
                <View style={styles.containerText}>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.textEmail}>{email}</Text>
                    <Text style={styles.textSector}>{sector}</Text>
                </View>
                <TouchableOpacity onPress={onDeleted}>
                    <Text style={styles.buttonDeleted}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Index = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sector, setSector] = useState('');
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState('Add');
    const [selectedUserItem, setSelectedUserItem] = useState({});

    useEffect(() => {
        get();
    }, []);

    const Add = () => {
        const data = {
            name,
            email,
            sector
        }
        //console.log('test', data);
        if(button === 'Add'){
            fetch('http://10.0.2.2:3004/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => {
                console.log('Success Add:', json);
                setName('');
                setEmail('');
                setSector('');
                get();
            })
        }else if(button === 'Update'){
            fetch(`http://10.0.2.2:3004/users/${selectedUserItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(json => {
                console.log('Success PUT:', json);
                setName('');
                setEmail('');
                setSector('');
                get();
                setButton('Add');
            })
        }
    }

    const get = () => {
        fetch('http://10.0.2.2:3004/users')
            .then(response => response.json())
            .then(json => {
                //console.log('Success Get:', json)
                setUsers(json);
            })
    }

    const selectedItems = (item) => {
        setSelectedUserItem(item)
        setName(item.name);
        setEmail(item.email);
        setSector(item.sector);
        setButton('Update');
    }

    const deletedItems = (item) => {
        console.log('Deleted :', item)
        const data = {
            id,
            name,
            email,
            sector
        }
        fetch(`http://10.0.2.2:3004/users/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(json => {
            get();
        })
    }

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Local DB Apps</Text>
            <View style={styles.containerInput}>
                <Text>Mobile Coding</Text>
                <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={(value) => setName(value)} />
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(value) => setEmail(value)} />
                <TextInput style={styles.input} placeholder='Sector' value={sector} onChangeText={(value) => setSector(value)} />
                <Button title={button} onPress={Add} />
            </View>
            <View style={styles.line} />
            <View>
            <ScrollView>
            {users.map(user => {
                return (
                    <ContainerItems 
                    key={user.id} 
                    name={user.name} 
                    email={user.email} 
                    sector={user.sector} 
                    onPress={() => selectedItems(user)}
                    onDeleted={() => Alert.alert(
                        'Alert',
                        'Are you sure delete this user!',
                        [
                            {text: 'No', onPress:() => console.log('Not')},
                            {text: 'Yes', onPress:() => deletedItems(user)}
                        ]
                    )} />
                )
            })}
            </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    containerInput: {
        marginVertical: 20
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    line: {
        height: 2,
        marginVertical: 1,
        backgroundColor: 'black'
    },
    containerItem: {
        flexDirection: 'row',
        marginVertical: 3,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    containerText: {
        marginVertical: 10,
        marginHorizontal: 10,
        flex: 1
    },
    textName: {
        fontSize: 15,
        fontWeight: '500'
    },
    textEmail: {
        fontSize: 15,
        fontWeight: '400'
    },
    textSector: {
        fontSize: 15,
        fontWeight: '400'
    },
    buttonDeleted: {
        fontWeight: '800',
        fontSize: 20,
        color: 'pink',
    }
})

export default Index;

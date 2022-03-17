import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

const ContainerItem = ({email, name, sector, onPress, onDelete}) => {
  return(
    <View style={styles.viewContain}>
      <View style={styles.viewItem}>
        <TouchableOpacity onPress={onPress}>
          <Image 
              source={{uri: `https://i.pravatar.cc/150?u=${email}.com`}}
              style={styles.avatar}/>
        </TouchableOpacity>
          <View style={styles.containerText}>
            <Text style={styles.textFullName}>{name}</Text>
            <Text style={styles.textEmail}>{email}</Text>
            <Text style={styles.textSector}>{sector}</Text>
          </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Local = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('');
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState('Save');
  const [selectedUsers, setSelectedUsers] = useState();

  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    const data = {
      name,
      email,
      sector
    }
    //example log data nya
    console.log('data before send ', data);
    //example log from json stringify
    console.log('data type stringify', JSON.stringify(data));
    if(button === 'Save'){
      fetch('http://10.0.2.2:3004/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      console.log('success:', json);
      setName('');
      setEmail('');
      setSector('');
      getData();
    })
    }else if(button === 'Update'){
      fetch(`http://10.0.2.2:3004/users/${selectedUsers.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(json => {
        console.log('update:', json)
        setName('');
        setEmail('');
        setSector('');
        getData();
        setButton('Save')
      })
    }
  }

  const getData = () => {
    fetch('http://10.0.2.2:3004/users')
    .then(response => response.json())
    .then(json => {
      //console.log('get data:', json);
      setUsers(json);
    })
  }

  const selectedItems = (item) => {
    console.log('selected item:', item)
    setSelectedUsers(item);
    setName(item.name);
    setEmail(item.email);
    setSector(item.sector);
    setButton('Update');
  }

  const deletedItems = (item) => {
    const data = {
      id,
      name,
      email,
      sector
    }
    console.log('Items on Deleted:', item)
    fetch(`http://10.0.2.2:3004/users/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      console.log('deleted: ', json);
      getData();
    })
  }

  return(
    <View style={styles.viewScreen}>
      <Text style={styles.title}>Local API ( JSON Server )</Text>
      <View style={styles.viewForm}>
        <Text>Form Member Pras Coding</Text>
        <TextInput placeholder='Full Name' style={styles.textInput} value={name} onChangeText={(value) => setName(value)}/>
        <TextInput placeholder='Email' style={styles.textInput} value={email} onChangeText={(value) => setEmail(value)}/>
        <TextInput placeholder='Sector' style={styles.textInput} value={sector} onChangeText={(value) => setSector(value)}/>
        <Button title={button} onPress={submit}/>
      </View>
      <View style={styles.line}/>
      {users.map(user => {
        return <ContainerItem 
        key={user.id} 
        name={user.name} 
        email={user.email} 
        sector={user.sector}
        onPress={() => selectedItems(user)}
        onDelete={() => Alert.alert(
          'Peringatan', 
          'Anda yakin ingin menghapus user ini?', 
          [
            {text: 'No', onPress: () => console.log('not button')}, 
            {text: 'Yes', onPress:() => deletedItems(user)}
          ])}
        />
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    viewScreen: {
      padding: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '700',
    },
    viewForm: {
      marginTop: 20,
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 20,
      marginVertical: 5
    },
    line: {
    height: 2,
    marginVertical: 10,
    backgroundColor: 'black'
    },
    viewContain: {
      marginVertical: 7
    },
    viewItem: {
      flexDirection: 'row',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40
    },
    containerText: {
      marginHorizontal: 10,
      marginVertical: 8,
      flex: 1
    },
    textFullName: {
      fontSize: 16,
      fontWeight: '700'
    },
    textEmail: {
      fontSize: 14,
    },
    textSector: {
      fontSize: 12,
    },
    delete: {
      fontSize: 18,
      fontWeight: '700',
      color: 'red'
    }
});

export default Local;
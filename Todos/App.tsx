import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { Task } from './types/Todo';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState<string>("")

  const STORAGE_KEY = 'tasks';

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setTasks(JSON.parse(json));
    };
    load();
  }, []);


  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };
  const addTodo = async () => {
    if (!input.trim()) return;
    await saveTasks([...tasks, { id: Date.now(), text: input, completed: 0 }]);
    setInput('');
  };

  const toggleTodo = async (id: number, completed: number) => {
    await saveTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: completed ? 0 : 1 } : t
    ));
  };

  const deleteTodo = async (id: number) => {
    await saveTasks(tasks.filter(t => t.id !== id));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Todo list</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={{ flex: 1 }}
            value={input}
            placeholder='Enter task'
            onChangeText={setInput}
            onSubmitEditing={addTodo}
          />
          <Button title="Save" onPress={addTodo} />
        </View>
        <FlatList<Task>
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Row
              item={item}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          )}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
});
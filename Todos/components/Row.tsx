import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Task } from '../types/Todo'

interface TodoItemProps {
    item: Task,
    deleteTodo: (id: number) => Promise<void>;
    toggleTodo: (id: number, completed: number) => Promise<void>;
}
export default function Row({ item, deleteTodo, toggleTodo }: TodoItemProps) {
    return (
        <View style={styles.todoItem}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => toggleTodo(item.id, item.completed)}
                accessibilityRole="button"
                accessibilityLabel={item.completed
                    ? `Mark ${item.text} as incomplete`
                    : `Mark ${item.text} as completed`}
            >
                <Text style={[
                    styles.todoText,
                    !!item.completed && styles.completedText
                ]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTodo(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 4,
        margin: 4,
        borderColor: '#c1c0c0',
        borderWidth: 8,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    todoText: {
        flex: 1,
        color: 'black',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '600',
    },
})

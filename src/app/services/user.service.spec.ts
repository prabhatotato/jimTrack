import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear(); // Clear localStorage to ensure a clean slate
    service = new UserService(); // Reinitialize the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data with 3 users if localStorage is empty', () => {
    const users = service.getUsers();
    expect(users.length).toBe(3);
  });

  it('should save users to localStorage', () => {
    const user: User = { id: '1', name: 'Test User', workouts: [{ type: 'Running', minutes: 30 }] };
    service.addUser(user);
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    expect(savedUsers.length).toBe(4); // 3 initial users + 1 new user
  });

  it('should add a new user', () => {
    const user: User = { id: '', name: 'New User', workouts: [{ type: 'Yoga', minutes: 50 }] };
    service.addUser(user);
    const users = service.getUsers();
    expect(users.length).toBe(4); // 3 initial users + 1 new user
    expect(users[3].name).toBe('New User');
  });

  it('should update an existing user', () => {
    const initialUsers = service.getUsers();
    const userToUpdate: User = { ...initialUsers[0], name: 'Updated Name' };
    service.updateUser(userToUpdate);
    const updatedUsers = service.getUsers();
    expect(updatedUsers[0].name).toBe('Updated Name');
  });

  it('should throw an error if trying to update a non-existent user', () => {
    const nonExistentUser: User = { id: '999', name: 'Non Existent', workouts: [] };
    expect(() => service.updateUser(nonExistentUser)).toThrowError('User not found');
  });

  it('should delete a user', () => {
    const initialUsers = service.getUsers();
    service.deleteUser(initialUsers[0].id);
    const usersAfterDeletion = service.getUsers();
    expect(usersAfterDeletion.length).toBe(2); // One user should be deleted
  });

  it('should filter users by name', () => {
    const filteredUsers = service.filterUsersByName('Jane');
    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].name).toBe('Jane Smith');
  });

  it('should filter users by workout type', () => {
    const filteredUsers = service.filterUsersByWorkoutType('Cycling');
    expect(filteredUsers.length).toBe(2);
  });
});

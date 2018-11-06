using System;
using System.Collections.Generic;
using System.Linq;
using Server.Net.data;
using Server.Net.Entities;
using Server.Net.Helpers;

namespace Server.Net.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
 
    public class UserService : IUserService
    {
        private DataContext _context;
 
        public UserService(DataContext context)
        {
            _context = context;
        }
 
        public User Authenticate(string name, string password)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(password))
                return null;
 
            var user = _context.Users.SingleOrDefault(x => x.name == name);
 
            // check if username exists
            if (user == null)
                return null;
 
            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
 
            // authentication successful
            return user;
        }
 
        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }
 
        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }
 
        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");
 
            if (_context.Users.Any(x => x.name == user.name))
                throw new AppException("User \"" + user.name + "\" already exist.");
 
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
 
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
 
            _context.Users.Add(user);
            _context.SaveChanges();
 
            return user;
        }
 
        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.key);
 
            if (user == null)
                throw new AppException("User not found");
 
            if (userParam.name != user.name)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.name == userParam.name))
                    throw new AppException("User " + userParam.name + " already exist.");
            }
 
            // update user properties
            user.name = userParam.name;
 
            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
 
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }
 
            _context.Users.Update(user);
            _context.SaveChanges();
        }
 
        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
 
        // private helper methods
 
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
 
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
 
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");
 
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }
 
            return true;
        }
    }
}
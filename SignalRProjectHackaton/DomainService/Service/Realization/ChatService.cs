using SignalR.Project.Hackaton.DAL.Repository.Interface;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Project.Hackaton.DomainService.Service.Realization
{
    public class ChatService : IChatService
    {
        private readonly IRepository<Message> _repositoryMessage;
        private readonly IUserRepository _repositoryUser;
        public ChatService(IRepository<Message> repositoryMessage,
                           IUserRepository repositoryUser)
        {
            _repositoryMessage = repositoryMessage;
            _repositoryUser = repositoryUser;
        }
        public async void SaveMsg(string msg, string email)
        {
            User user = await _repositoryUser.GetByEmail(email);
            var message = new Message()
            {
                Msg = msg,
                DateTime = DateTime.Now,
                UserId = user.Id
            };
            _repositoryMessage.Create(message);
        }
        public async Task<List<Message>> GetAllMsg()
        {
            var msgs = await _repositoryMessage.GetAll();
            return msgs;
        }
        public string Decrypt(string cipherText, string AESKey)
        {
            return AESEncryption.DecryptStringAES(cipherText, AESKey);
        }
        public string Encrypt(string message, string AESKey)
        {
            return AESEncryption.EncryptStringAES(message, AESKey);
        }
    }
}

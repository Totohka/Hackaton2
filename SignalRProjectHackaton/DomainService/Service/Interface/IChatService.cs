using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DomainService.Service.Interface
{
    public interface IChatService 
    {
        public Task<List<Message>> GetAllMsg();
        public void SaveMsg(string msg, string email);
        public string Encrypt(string message, string AESKey);
        public string Decrypt(string cipherText, string AESKey);
    }
}

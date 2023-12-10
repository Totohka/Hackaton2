namespace SignalR.Project.Hackaton.DAL.Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<T> Get(int id);
        Task<List<T>> GetAll();
        void Create(T item);
        void Update(T item);
        void Delete(int id);
    }
}

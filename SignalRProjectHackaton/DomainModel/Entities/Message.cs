namespace SignalR.Project.Hackaton.DomainModel.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Msg { get; set; }
        public DateTime DateTime { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
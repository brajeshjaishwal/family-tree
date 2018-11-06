namespace Server.Net.Entities
{
    public class Member
    {
        public int key { get; set; }
        public int user { get; set; }
        public string name { get; set; }
        public string relation { get; set; }
        public int parent { get; set; }
    }
}
public DbSet<SystemConfiguration> SystemConfigurations { get; set; }
public class SystemConfiguration
{
    public int ID { get; set; }
    public int MaxTasksPerUser { get; set; }
    public int DefaultPriority { get; set; }
}

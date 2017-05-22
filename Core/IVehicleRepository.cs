using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Controllers.Resources;
using vega.Core.Models;


namespace vega.Core
{
    public interface IVehicleRepository
    {
         Task<QueryResult<Vehicle>>  GetVehicles(VehicleQuery filter);
         Task<Vehicle> GetVehicle(int id, bool includeRelated=true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}
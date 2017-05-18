using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace vega.Controllers.Resources
{
    public class SaveVehicleResource
    {
        // primary key
        public int Id { get; set;}

        // foreign key
        public int ModelId {get; set;}
        

        public bool IsRegistered {get; set;}

        [Required]
        public ContactResource Contact {get; set;}
        
        public ICollection<int> Features {get; set;}

        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}
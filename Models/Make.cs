using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace vega.Models
{
    public class Make
    {
        public Make(int id, string name)
        {
            this.Id = id;
            this.Name = name;

        }
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }

        // Best practice => Initialize this class because it has a Collection
        // Initialization is the responsibility of the class.
        public Make()
        {
            Models = new Collection<Model>();
        }

    }
}
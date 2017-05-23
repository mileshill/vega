using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly PhotoSettings photoSettings;

        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IPhotoRepository photoRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PhotosController(
            IHostingEnvironment host, 
            IVehicleRepository repository, 
            IPhotoRepository photoRepository,
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
        }

        // /api/vehicles/{id:}/photos
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
    
            // Inspect uploaded file
            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empy file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("File exceedes 10Mb");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");
            
            // Load vehicle
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            // Check for directory; create if not exists
            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Store the new file name
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            // Open stream to read file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create new photo object
            var photo = new Photo { FileName = fileName };

            // Add to vehicle
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

        }

        [HttpGetAttribute]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);
            
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }        

    }
}
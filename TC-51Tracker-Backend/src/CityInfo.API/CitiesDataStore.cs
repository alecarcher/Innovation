using CityInfo.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API
{
    public class CitiesDataStore
    {
        public static CitiesDataStore Current { get; } = new CitiesDataStore();
        public List<CityDto> Cities { get; set; }

        public CitiesDataStore()
        {
            // init dummy data
            Cities = new List<CityDto>()
            {
                new CityDto()
                {
                     Id = 1,
                     Name = "TC-51 (1111)",
                     Description = "John Smith - Active 5 mins ago - 87%",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 1,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 2,
                             Name = "History",
                             Description = "History" },
                     }
                },
                new CityDto()
                {
                     Id = 2,
                     Name = "TC-51 (2222)",
                     Description = "Lucy Jones - Active 23 mins ago - 0%",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 3,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 4,
                             Name = "History",
                             Description = "History" },
                     }
                },
                new CityDto()
                {
                     Id = 3,
                     Name = "TC-51 (3333)",
                     Description = "Mark Johnson - Active Now",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 5,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 6,
                             Name = "History",
                             Description = "History" },
                     }
                },
                new CityDto()
                {
                     Id = 4,
                     Name = "TC-51 (4444)",
                     Description = "Alice Johnson - Active 45 mins ago",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 7,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 8,
                             Name = "History",
                             Description = "History" },
                     }
                },
                new CityDto()
                {
                     Id = 5,
                     Name = "TC-51 (5555)",
                     Description = "Tony Wood - Active 4 hours ago",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 9,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 10,
                             Name = "History",
                             Description = "History" },
                     }
                },
                new CityDto()
                {
                     Id = 6,
                     Name = "TC-51 (6666)",
                     Description = "Lily Morris - Active Now",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 11,
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterestDto() {
                             Id = 12,
                             Name = "History",
                             Description = "History" },
                     }
                },
            };

        }
    }
}

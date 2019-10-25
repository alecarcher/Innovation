using CityInfo.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API
{
    public static class CityInfoExtensions
    {
        public static void EnsureSeedDataForContext(this CityInfoContext context)
        {
            if (context.Cities.Any())
            {
                return;
            }

            // init seed data
            var cities = new List<City>()
            {
                new City()
                {
                     Name = "TC-51 (1111)",
                     Description = "John Smith - Active 5 mins ago - 87%",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
                new City()
                {
                     Name = "TC-51 (2222)",
                     Description = "Lucy Jones - Active 23 mins ago - 0%",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
                new City()
                {
                     Name = "TC-51 (3333)",
                     Description = "Mark Johnson - Active Now",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
                new City()
                {
                     Name = "TC-51 (4444)",
                     Description = "Alice Johnson - Active 45 mins ago",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
                new City()
                {
                     Name = "TC-51 (5555)",
                     Description = "Tony Wood - Active 4 hours ago",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
                new City()
                {
                     Name = "TC-51 (6666)",
                     Description = "Lily Morris - Active Now",
                     PointsOfInterest = new List<PointOfInterest>()
                     {
                         new PointOfInterest() {
                             Name = "Location",
                             Description = "Location" },
                          new PointOfInterest() {
                             Name = "History",
                             Description = "History" },
                     }
                },
            };

            context.Cities.AddRange(cities);
            context.SaveChanges();
        }
    }
}

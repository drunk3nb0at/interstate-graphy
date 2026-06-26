# interstate-graphy

Web Graph for US interstate system with SolidJS, starting from my diagonally crossed country move.

[Figma](https://www.figma.com/design/9l1vbLvsVMshXAM8Vg3k8i/Interstate-Graphy?node-id=0-1&t=6NtEBa3kl33UBc37-1)
## Get started

Fork this repo and then:

```bash
# init 
npm init solid

# get started
cd interstate-graphy
npm install
npm run dev

# install d3.js
npm add d3
```

The challenge is you will spend way more than the estimate time on road, and you actually not wanna rest or lodge in big cities.

[Google Maps Routes](https://www.google.com/maps/dir/Georgia+Institute+of+Technology,+Atlanta,+GA+30332/OMSI,+1945+SE+Water+Ave,+Portland,+OR+97214/@36.9995357,-90.2075559,855636m/data=!3m2!1e3!5s0x54950a72efa74aab:0x4a498953338b7c0a!4m14!4m13!1m5!1m1!1s0x88f5048aebc34fe3:0xb52ad03e3ad8c50f!2m2!1d-84.3979638!2d33.7779791!1m5!1m1!1s0x54950a72e8b112d1:0xd074694827faf84c!2m2!1d-122.6660355!2d45.5083931!3e0?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D)

## Thinking

Does it make sense to use city as node for all main interstate road, and how to define which city to use.

Or I can start with my trip (ATL - PDX) route planning

## Dataset
[A List of Highways and Roads GIS Datasets](https://gisgeography.com/highways-roads-gis-data/)

[TIGER/Line Shapefile, 2023, Nation, U.S., Primary Roads](https://catalog.data.gov/dataset/tiger-line-shapefile-2023-nation-u-s-primary-roads)

[BTS Transportation Data](https://www.bts.gov/maps)

## Style Ref

https://sondaven.com/en

- simple opening page, moving goat (car in my case)
- scroll event(incomplete page effect, 3d effect)



// Loads a 3D Model containing NGones (.OFF) and imports it into a csg
// From http://www.geomview.org/docs/html/OFF.html
function main(){   
  return Off2Csg(file());
}

function Off2Csg(off){ 
var fl, nbs, nbPts, nbPolys, points, i, polys, f, pts, j;

    fl = off.split('\n');
    if(fl[0].startsWith("OFF")) // remove if contains 'OFF'
		fl.shift(); 
    nbs = fl.shift().split(' '); // read lengths [#vertices #polys 0]
    nbPts  = Number(nbs[0]);
    nbPolys = Number(nbs[1]);
    points = [];
    for(i = 0; i < nbPts; i++){ // read vertices [x, y, z]
		nbs = fl[i].split(' ').map(Number);
		points.push(new CSG.Vertex(
		  new CSG.Vector3D(nbs[0],nbs[1],nbs[2])));
	}
	polys = [];
	f = [];
    for(i = 0; i < nbPolys; i++){ // read polygons [vertex indices]
		nbs = fl[nbPts + i].split(' ').map(Number);
		
		pts = []; // sets this array with vertices of the polygon
		for(j = 1; j <= nbs[0]; j++){
			pts.push(points[nbs[j]].pos);
		}
	    // create the polygon
		f.push(CSG.Polygon.createFromPoints(pts).flipped());
	}
	return CSG.fromPolygons(f);
}
function file(){// copy-paste of a .off file
	return `OFF
32 12 0
4.236068 0 1.618034 
2.618034 2.618034 2.618034 
0 1.618034 4.236068 
0 -1.618034 4.236068 
2.618034 -2.618034 2.618034 
1.894427 4.768372e-08 3.065248 
-2.618034 2.618034 2.618034 
-4.236068 0 1.618034 
-2.618034 -2.618034 2.618034 
-1.894427 0 3.065248 
1.618034 4.236068 0 
-1.618034 4.236068 0 
0 3.065248 1.894427 
-1.618034 -4.236068 0 
1.618034 -4.236068 0 
-4.768372e-08 -3.065248 1.894427 
4.236068 0 -1.618034 
2.618034 2.618034 -2.618034 
3.065248 1.894427 4.768372e-08 
-2.618034 2.618034 -2.618034 
-4.236068 0 -1.618034 
-3.065248 1.894427 0 
-2.618034 -2.618034 -2.618034 
-3.065248 -1.894427 4.768372e-08 
2.618034 -2.618034 -2.618034 
3.065248 -1.894427 2.384186e-08 
0 1.618034 -4.236068 
0 3.065248 -1.894427 
0 -1.618034 -4.236068 
0 -3.065248 -1.894427 
1.894427 0 -3.065248 
-1.894427 0 -3.065248 
5 0 4 3 2 1 
5 6 2 3 8 7 
5 6 11 10 1 2 
5 8 3 4 14 13 
5 1 10 17 16 0 
5 6 7 20 19 11 
5 8 13 22 20 7 
5 0 16 24 14 4 
5 11 19 26 17 10 
5 22 13 14 24 28 
5 17 26 28 24 16 
5 22 28 26 19 20 
`;
}


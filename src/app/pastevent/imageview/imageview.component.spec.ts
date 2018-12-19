import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageviewComponent } from './imageview.component';

describe('ImageviewComponent', () => {
  let component: ImageviewComponent;
  let fixture: ComponentFixture<ImageviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// // ############################################# 
// .card{
// 	height: 400px;
// 	width: auto;
// 	background: none;
// 	margin: 5px;
// 	border: none;
//     display: grid;
    
// }
  
// .gallery{
//     background: linear-gradient(180deg, var(--yellow) 40% , var(--lightblue) 80% );
//    width: calc(100% - 100px);
//    padding-bottom: 10px;
//    text-align: center;
//    padding: 0 50px;
   
//  }
//  .images{
// 	width: 100%;
// 	height: 400px;
// 	 padding:20px; 
	
// 	transition: 0.7s all ease-in-out;
	
//   }
//   .images:hover{
// 	transform: scale(1.1);
   
//   }

//   /* .grid-container {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//     grid-gap: 1em;
// } */

// /* below code affect when display size lower than 800px. so we can arrange icons like below and can customize by with below code */
// @media screen and (max-width :1000px){
	
	
	

	
	
// 	.gallery{
// 	  width: 100%;
// 	  padding: 0;
// 	   background: black;
// 	}
	
// 	.images{
	 
// 	  padding: 0;
// 	  width: 100%;
// 	}
// 	.images:hover{
// 	  transform: scale(1.1);
// 	}
// 	}

// /* ################ box inner and other css parts start */

// .wrap {
//     overflow: hidden;
//     margin: 10px;
//   max-width: 1500px;
//   margin-left: auto;
//   margin-right: auto;
// }
// .box {
//     float: left;
//     position: relative;
//     width: 20%;
//     padding-bottom: 20%;
// }

// .boxInner {
//     position: absolute;
//     left: 10px;
//     right: 10px;
//     top: 10px;
//     bottom: 10px;
//     overflow: hidden;
// }
//  .boxInner img { width: 100% }

 
// @media only screen and (max-width:480px) { 
//     /* Smartphone view: 1 tile */
//     .box {
//         width: 100%;
//         padding-bottom: 100%;
//     }
// }
// @media only screen and (max-width:650px) and (min-width:481px) { 
//     /* Tablet view: 2 tiles */
//     .box {
//         width: 50%;
//         padding-bottom: 50%;
//     }
// }
// @media only screen and (max-width:1050px) and (min-width:651px) { 
//     /* Small desktop / ipad view: 3 tiles */
//     .box {
//         width: 33.3%;
//         padding-bottom: 33.3%;
//     }
// }
// @media only screen and (max-width:1290px) and (min-width:1051px) { 
//     /* Medium desktop: 4 tiles */
//     .box {
//         width: 25%;
//         padding-bottom: 25%;
//     }
// }

// /* #################### */

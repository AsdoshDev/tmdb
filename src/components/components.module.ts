import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { MovieDtlsComponent } from './movie-dtls/movie-dtls';
import { StarRatingComponent } from './star-rating/star-rating';
@NgModule({
	declarations: [MovieComponent,
    MovieDtlsComponent,
    StarRatingComponent],
	imports: [],
	exports: [MovieComponent,
    MovieDtlsComponent,
    StarRatingComponent]
})
export class ComponentsModule {}

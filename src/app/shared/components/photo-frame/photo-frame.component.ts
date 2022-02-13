import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy{
    @Output() public liked: EventEmitter<void> = new EventEmitter();
    @Input() public description = '';
    @Input() public src = '';
    @Input() public likes = 0;
    private debounceSbject: Subject<void> = new Subject();
    private unSubscribe: Subject<void> = new Subject();

    ngOnInit(): void {
        this.debounceSbject
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(takeUntil(this.unSubscribe))
        .subscribe(() => this.liked.emit());
    }

    ngOnDestroy(): void {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }

    public like(): void{
        this.debounceSbject.next();
    }
}
#!/bin/bash
rm -rf bundles/visualizer/dist
cp -r visualizer/dist bundles/visualizer
cd bundles/visualizer && zip -r visualizer.zip .